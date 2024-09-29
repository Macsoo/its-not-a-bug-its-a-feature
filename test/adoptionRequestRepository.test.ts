import {PrismaClient} from '@prisma/client';
import {expect, test} from "@jest/globals";
import {
    addRequest, approveRequest,
    deleteRequestById,
    getDogRequests,
    getRequest,
    getUserRequests,
    listAllRequest, updateRequest
} from "../src/server/adoptionRequestRepository";

const prisma = new PrismaClient();
const mockRequest = {
    userId: 1,
    dogId: 1,
    approved: false,
}

test("Testing adoption requests", async () => {
    prisma.$transaction(async () => {
        expect(await addRequest(mockRequest)).toReturn();
        const requests = await listAllRequest();
        expect(requests).not.toBe(null);
        const addedMockRequest = await getRequest(requests[-1].id);
        expect(addedMockRequest).toContain(mockRequest);
        expect(await addRequest({userId: 1, dogId: 2})).toReturn();
        expect(await addRequest({userId: 1, dogId: 3})).toReturn();
        expect(await addRequest({userId: 2, dogId: 3})).toReturn();
        const filteredByDog = await getDogRequests(2);
        expect(filteredByDog).toContain({
            userId: 1,
        });
        const filteredByUser = await getUserRequests(1);
        expect(filteredByUser).toContain({
            dogId: 1,
        });
        await deleteRequestById(filteredByUser[-1].id);
        const afterDeleteRequest = await getUserRequests(1);
        expect(afterDeleteRequest.length).toBeLessThan(filteredByUser.length);
        expect(await addRequest(mockRequest)).toThrowError();
        await approveRequest(requests[-1].id);
        const beforeApprove = await getRequest(requests[-1].id);
        expect(beforeApprove).toContain({
            approved: true,
        });
        await updateRequest({id: requests[-1].id, approved: false});
        const afterApprove = getRequest(requests[-1].id);
        expect(beforeApprove).not.toEqual(afterApprove);
    })
})