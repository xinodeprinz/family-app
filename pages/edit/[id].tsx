import { Form, Header, Protected } from "@/components";
import { useRouter } from "next/router";

const EditForm: React.FC = () => {
  const router = useRouter();
  const id = parseInt(router.query.id as string);
  console.log(id);
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-2/3 mx-auto">
          <Form type="edit" id={id} />
        </div>
      </div>
    </>
  );
};

export default Protected(EditForm, true);
