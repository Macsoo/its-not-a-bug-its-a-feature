const adoptRequests = [
    {
        request_id: 1,
        user_id: 101,
        dog_id: 201,
        request_date: '2024-09-01',
        status: false,
        dog_name: 'Buddy',
        user_email: 'user1@example.com',
        user_tel: '123-456-7890'
    },
    {
        request_id: 2,
        user_id: 101,
        dog_id: 202,
        request_date: '2024-09-02',
        status: true,
        dog_name: 'Max',
        user_email: 'user2@example.com',
        user_tel: '234-567-8901'
    },
    {
        request_id: 3,
        user_id: 102,
        dog_id: 203,
        request_date: '2024-09-03',
        status: false,
        dog_name: 'Charlie',
        user_email: 'user1@example.com',
        user_tel: '123-456-7890'
    }
];

export function RequestListUser({user_id}: {
    user_id:number,
}) {
    const userRequests = adoptRequests.filter(request => request.user_id === user_id);

    return (
        <table id="requestTable">
            <thead>
            <tr>
                <th>Request ID</th>
                <th>Request Date</th>
                <th>Dog ID</th>
                <th>Dog Name</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {userRequests.map((request) => (
                <tr>
                    <td> {request.request_id}  </td>
                    <td> {request.request_date} </td>
                    <td> {request.dog_id} </td>
                    <td> {request.dog_name} </td>
                    <td> {request.status ? 'Elfogadva' : 'Eredményre vár'} </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

// RequestListAdmin Component
export function RequestListAdmin() {
    const pendingRequests = adoptRequests.filter(request => !request.status);

    return (
        <table id="requestTable">
            <thead>
            <tr>
                <th>Request ID</th>
                <th>Request Date</th>
                <th>Dog ID</th>
                <th>User ID</th>
                <th>User Email</th>
                <th>User Tel</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {pendingRequests.map((request) => (
                <tr>
                    <td> {request.request_id}  </td>
                    <td> {request.request_date} </td>
                    <td> {request.dog_id} </td>
                    <td> {request.user_id} </td>
                    <td> {request.user_email} </td>
                    <td> {request.user_tel} </td>
                    <td>
                        <button id="adoptButton">Elfogad</button>
                        <button id="deleteDogButton">Elutasít</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}