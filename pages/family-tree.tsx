import { Button, Header, Protected } from "@/components";
import { axios, formatDate } from "@/components/utils";
import { IUser } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FamilyTree = () => {
  const router = useRouter();
  const [members, setMembers] = useState<IUser[]>([]);

  useEffect(() => {
    const getMembers = async () => {
      const res = await axios<IUser[]>({ method: "GET", url: "/api/users" });
      setMembers(res);
    };
    getMembers();
  }, []);

  const renderNode = (member: any) => {
    return (
      <div key={member.id} className="flex flex-col items-center m-4">
        <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center">
          <span className="text-gray-800 font-bold uppercase">
            {member.name[0]}
          </span>
        </div>
        <div className="mt-2 text-center">
          <span className="text-gray-800 font-semibold capitalize">
            {member.name}
          </span>
          <br />
          <span className="text-gray-600 text-sm">
            {formatDate(member.dob)}
          </span>
        </div>
      </div>
    );
  };

  const renderFamilyTree = (members: any) => {
    return (
      <div className="flex flex-wrap justify-center -mt-8">
        {members.map((member: any) => {
          const mother = members.find((m: any) => m.id === member.mother_id);
          const father = members.find((m: any) => m.id === member.father_id);
          return (
            <div key={member.id} className="p-4">
              {renderNode(member)}
              {mother && renderNode(mother)}
              {father && renderNode(father)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="container w-4/5 mx-auto py-5">
        <div className="flex justify-end mb-10">
          <Button
            type="button"
            status="success"
            text="go back"
            onClick={() => router.back()}
          />
        </div>
        {renderFamilyTree(members)}
      </div>
    </>
  );
};

export default Protected(FamilyTree, true);
