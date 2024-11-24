'use client';

import React, {useState} from "react";
import {useServerAction} from "@/utils";
import {getAllUsers} from "@/server/userRepository";

type User = {
    id: string,
    email: string,
    isAdmin: boolean,
}

export default function UserList() {
    const [editable, setEditable] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>([])

    useServerAction(async () => {
        setUsers(await getAllUsers());
    })

    const handleSubmit = () => {
        setEditable(false);
    }

    const handleCancel = () => {
        setEditable(false);
    }

    return (
        <div className="card">
            {!editable && (
                <div className={`sm:grid`}>
                    <h2 className={`pt-2 sm:col-[1] sm:row-[1] max-sm:text-center`}> Felhasználók kezelése: </h2>
                    <button
                        className={`sm:col-[2] sm:row-[1] sm:justify-self-end sm:self-center max-sm:pt-0 mt-0 max-sm:w-full
                            max-sm:m-0 max-sm:mb-2.5`}
                        onClick={() => setEditable(true)}>Szerkesztés
                    </button>
                    <div className={"tableContainer row-[2] col-span-2"}>
                        <table>
                            <thead>
                            <tr>
                                <th className={`min-w-[110px]`}>Felhasználó<br/>e-mail</th>
                                <th className={'min-w-[150px]'}>Jogosultság</th>
                                <th className={`min-w-[80px]`}>Chat</th>
                            </tr>
                            </thead>
                            <tbody>
                            <Users users={users} editable={editable}/>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {editable && (
                <form className={`sm:grid`} onSubmit={handleSubmit}>
                    <h2 className={`pt-2 sm:col-[1] sm:row-[1] max-sm:text-center`}> Felhasználók kezelése: </h2>
                    <div
                        className={`pt-2 sm:col-[2] sm:row-[1] flex flex-col sm:flex-row sm:items-end items-center
                        sm:justify-end sm:pr-2
                         w-full gap-2.5 sm:m-2.5 max-sm:pt-0 max-sm:mt-0 max-sm:mb-2.5`}>
                        <input id={`updateUsers`} type="submit"
                               value={"Mentés"}/>
                        <input id={`reset`} type="reset" onClick={handleCancel} value={"Mégsem"}/>
                    </div>
                    <div className={"tableContainer row[3] col-span-2"}>
                        <table>
                            <thead>
                            <tr>
                                <th className={`min-w-[110px]`}>Felhasználó<br/>e-mail</th>
                                <th className={'min-w-[150px]'}>Jogosultság</th>
                                <th className={`min-w-[80px] max-w-[80px]`}>Törlés</th>
                            </tr>
                            </thead>
                            <tbody>
                            <Users users={users} editable={editable}/>
                            </tbody>
                        </table>
                    </div>
                </form>
            )}
        </div>
    )

    function Users(params: { users: User[], editable: boolean }) {
        return (
            <>
                {params.users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>
                            <select
                                className={`dogUpdateInput`}
                                value={user.isAdmin ? "admin" : "user"}
                                onChange={(e) => {
                                    e.target.value === 'admin' ? user.isAdmin = true : user.isAdmin = false
                                }}
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </td>
                        {params.editable && (
                            <td className={`deleteUserTD`}>
                                <input type="checkbox"/>
                            </td>
                        )}
                        {!params.editable && (
                            <td className={`deleteUserTD`}>
                                <button/>
                            </td>
                        )}
                    </tr>
                ))}
            </>
        )
    }
};

