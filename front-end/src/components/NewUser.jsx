
import {useMutation, gql} from "@apollo/client";
import {useState} from "react";
import {GET_ALL_USERS} from "./UsersList";

const ADD_USER = gql`
mutation AddUser($name:String,$age:Int$job:String,$gender:String) {
  addUser(name:$name,age:$age,job:$job,gender:$gender) {
    name
    age
    job
    gender
  }
}

`;



const NewUser = () => {


    const [name, setName] = useState('');
    const [age, setAge] = useState();
    const [job, setJob] = useState('');
    const [gender, setGender] = useState('');

    const [addUser, {error}] = useMutation(ADD_USER, {
        refetchQueries: [
            GET_ALL_USERS,
            'Users'
        ],
    });

    const handleSubmit = e => {
        e.preventDefault();

        addUser({
            variables: {
                name,
                age:4,
                job,
                gender
            }
        })

    }

    return (
        <form className="flex flex-col gap-1 max-w-[768px] w-full mx-auto border border-gray-500 p-3" onSubmit={handleSubmit}>
            <input required type="text" placeholder="name" onChange={e => setName(e.target.value)} />
            <input required type="number" placeholder="age" onChange={e => setAge(e.target.value)} min="1"  />
            <input required type="text" placeholder="job" onChange={e => setJob(e.target.value)} />
            <input required type="text" placeholder="gender" onChange={e => setGender(e.target.value)}/>
            <button type="submit" className="bg-blue-600 text-white w-28 h-8 rounded-md">Add new user</button>
        </form>
    )
}

export default NewUser;