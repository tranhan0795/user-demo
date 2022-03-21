import {useQuery, gql} from "@apollo/client";
import SingleUser from "./SingleUser";

const GET_ALL_USERS = gql`
query Users{
    allUsers{
        id,
        name,
        gender,
        job,
        age
    }
}
`

const UsersList = () => {

    const {data, loading, error} = useQuery(GET_ALL_USERS)

    if (error) return `${error.message}`;
    if (loading) return 'Loading...';
    console.log(data);
    return (
        <div className="mt-8 flex items-center">
            <table className="table-auto max-w-[768px] w-full text-center border border-slate-500 ">
                <thead>
                    <tr>
                        <th className="border border-slate-500">ID</th>
                        <th className="border border-slate-500">Name</th>
                        <th className="border border-slate-500">Age</th>
                        <th className="border border-slate-500">Gender</th>
                        <th className="border border-slate-500">Job</th>
                    </tr>
                </thead>
                {data.allUsers.map((user) => <SingleUser {...user} />)}
            </table>
        </div>
    )
}


export default UsersList;