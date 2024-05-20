import { Button, Header, Protected } from "@/components";
import { axios, formatDate, sweetAlert } from "@/components/utils";
import type { IUser } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios<IUser[]>({ method: "GET", url: "/api/users" });
      setUsers(res);
    };
    getUsers();
  }, []);

  const deleteUser = async (id: number) => {
    const res = await axios<IUser[]>({
      method: "DELETE",
      url: `/api/users/delete/${id}`,
    });
    setUsers(res);
    sweetAlert({ icon: "success", title: "User deleted" });
  };

  return (
    <>
      <Header />
      <div className="container w-4/5 mx-auto py-10">
        <div className="flex justify-between mb-8">
          <Button
            text="add member"
            type="button"
            status="primary"
            className="text-sm"
            onClick={() => router.push("/add")}
          />
          <Button
            text="family tree"
            type="button"
            status="success"
            className="text-sm"
            onClick={() => router.push("/family-tree")}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-2 text-left border">#</th>
                <th className="p-2 text-left border">Name</th>
                <th className="p-2 text-left border">Email</th>
                <th className="p-2 text-left border">DOB</th>
                <th className="p-2 text-left border">Address</th>
                <th className="p-2 text-left border">Phone</th>
                <th className="p-2 text-left border">Mother</th>
                <th className="p-2 text-left border">Father</th>
                <th className="p-2 text-left border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td className="border p-2">{++index}</td>
                  <td className="border p-2 capitalize">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{formatDate(user.dob)}</td>
                  <td className="border p-2 capitalize">{user.address}</td>
                  <td className="border p-2">{user.phone}</td>
                  <td className="border p-2 capitalize">
                    {user.mother ? user.mother.name : "-"}
                  </td>
                  <td className="border p-2 capitalize">
                    {user.father ? user.father.name : "-"}
                  </td>
                  <td className="border p-2 capitalize">
                    <div className="flex gap-x-3">
                      <Button
                        text="edit"
                        status="primary"
                        type="button"
                        className="text-sm"
                        onClick={() => router.push(`/edit/${user.id}`)}
                      />
                      <Button
                        text="delete"
                        status="danger"
                        type="button"
                        className="text-sm"
                        onClick={() => deleteUser(user.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Protected(Home, true);
