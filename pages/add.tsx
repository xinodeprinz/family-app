import { Form, Header, Protected } from "@/components";

const AddForm: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-2/3 mx-auto">
          <Form type="add" />
        </div>
      </div>
    </>
  );
};

export default Protected(AddForm, true);
