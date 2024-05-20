import { Header, Protected } from "@/components";

const FamilyTree = () => {
  return (
    <>
      <Header />
    </>
  );
};

export default Protected(FamilyTree, true);
