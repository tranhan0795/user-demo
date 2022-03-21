const SingleUser = ({age, name, gender, job, id}) => {
    console.log(age, name, gender, job, id);
    return (
        <tr>
            <td className="border border-slate-500">{id}</td>
            <td className="border border-slate-500">{name}</td>
            <td className="border border-slate-500">{age}</td>
            <td className="border border-slate-500">{gender}</td>
            <td className="border border-slate-500">{job}</td>
            <td className="border border-slate-500"><button className="h-10 text-white bg-blue-600 rounded-md">Edit</button></td>
            <td className="border border-slate-500"><button className="h-10 text-white bg-red-600 rounded-md">Delete</button></td>

        </tr>
    )
}

export default SingleUser;