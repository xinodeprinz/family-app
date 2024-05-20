import { Button, Header, Protected } from "@/components";
import { useRouter } from "next/router";

const Home: React.FC = () => {
  const router = useRouter();
  const members = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      dob: "1990-01-01",
      address: "123 Main St",
      phone: "555-1234",
      mother: "Jane Doe",
      father: "John Doe Sr.",
    },
    // Add more member objects here
  ];

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
              {members.map((member) => (
                <tr key={member.id}>
                  <td className="border p-2">{member.name}</td>
                  <td className="border p-2">{member.email}</td>
                  <td className="border p-2">{member.dob}</td>
                  <td className="border p-2">{member.address}</td>
                  <td className="border p-2">{member.phone}</td>
                  <td className="border p-2">{member.mother}</td>
                  <td className="border p-2">{member.father}</td>
                  <td className="border p-2">
                    <div className="flex gap-x-3">
                      <Button
                        text="edit"
                        status="primary"
                        type="button"
                        className="text-sm"
                        onClick={() => router.push(`/edit/${member.id}`)}
                      />
                      <Button
                        text="delete"
                        status="danger"
                        type="button"
                        className="text-sm"
                        onClick={() => console.log(`Deleting ${member.id}`)}
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
