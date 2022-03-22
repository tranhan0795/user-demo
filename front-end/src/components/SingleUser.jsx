import {useEffect, useState} from "react";
import {useMutation, gql} from "@apollo/client";
import {GET_ALL_USERS} from "./UsersList";



const DELETE_USER = gql`
mutation DeleteUser($id:Int){
    deleteUser(id:$id)
}
`
const UPDATE_USER = gql`
mutation UpdateUser($updateUserId:Int, $name:String, $age:Int, $job:String, $gender:String ){
    updateUser(id:$updateUserId,name:$name,age:$age,job:$job,gender:$gender){
        id
    }
}
`


const SingleUser = ({age, name, gender, job, id}) => {
    console.log(age, name, gender, job, id);

    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(name);
    const [newAge, setNewAge] = useState(age);
    const [newGender, setNewGender] = useState(gender);
    const [newJob, setNewJob] = useState(job);


    const [deleteUser, {error: deleteError}] = useMutation(DELETE_USER, {
        refetchQueries: [
            GET_ALL_USERS
        ]
    })

    const [updateUser, {error: updateError}] = useMutation(UPDATE_USER, {
        refetchQueries: [
            GET_ALL_USERS
        ]
    })

    useEffect(() => {
        if (deleteError) {
            alert("Error!! user has not been deleted!!");
        }
    }, [deleteError])


    useEffect(() => {
        if (updateError) {
            alert("Error!! user has not been updated!!");
        }
    }, [updateError])

    const handleDelete = () => {
        if (!window.confirm("are you sure want to delete this user?")) {
            setIsEditing(false);
            return;
        }

        deleteUser({
            variables: {
                id
            }
        })
    }


    const handleUpdate = () => {

        if (name === newName && age === parseInt(newAge) && gender === newGender && newJob === job) {
            alert("Change at least one field before update");
            return;
        }

        updateUser({
            variables: {
                updateUserId: id,
                name: newName,
                age: parseInt(newAge),
                job: newJob,
                gender: newGender
            }
        })

        setIsEditing(false);
    }


    return (
        <tr >
            <td className="border border-slate-500">{id}</td>
            {isEditing ?
                <>
                    <td className="border border-slate-500"><input onChange={e => setNewName(e.target.value)} value={newName} /></td>
                    <td className="border border-slate-500"><input onChange={e => setNewAge(e.target.value)} value={newAge} /></td>
                    <td className="border border-slate-500"><input onChange={e => setNewGender(e.target.value)} value={newGender} /></td>
                    <td className="border border-slate-500"><input onChange={e => setNewJob(e.target.value)} value={newJob} /></td>
                    <td className="border border-slate-500 p-1">
                        <button className="w-16 text-white bg-blue-600 rounded-sm" onClick={handleUpdate}>
                            Update
                        </button>
                    </td>
                    <td className="border border-slate-500">
                        <button className="w-16 text-white bg-red-600 rounded-sm " onClick={e => setIsEditing(false)}>
                            Cancel
                        </button>
                    </td>
                </>
                : <>
                    <td className="border border-slate-500">{name}</td>
                    <td className="border border-slate-500">{age}</td>
                    <td className="border border-slate-500">{gender}</td>
                    <td className="border border-slate-500">{job}</td>
                    <td className="border border-slate-500 p-1">
                        <button className="w-16 text-white bg-blue-600 rounded-sm" onClick={e => setIsEditing(true)}>Edit</button>
                    </td>
                    <td className="border border-slate-500">
                        <button className="w-16 text-white bg-red-600 rounded-sm" onClick={handleDelete}>Delete</button>
                    </td>
                </>
            }
        </tr>
    )
}

export default SingleUser;