// "use client";
// import SideMenu from "../../../components_admin/SideMenu";
// import Header from "../../components_admin/Header";
import SubcategoriesTable from "../../../components_admin/categories/SubcategoriesTable";
import FormCategory from "../../../components_admin/categories/CategoryForm";

export default function Subcategories({ params }) {
  const { id } = params;

  return (
    <div className="h-screen bg-[#F9FAFB]">
      <div className=" w-full bg-[#F9FAFB]">
        <div className=" pt-5 mx-5 relative h-full  ">
          <div className="flex justify-center md:w-[80%] xs:w-full absolute items-center ">
            <FormCategory CategoryId={id} />
          </div>
          <SubcategoriesTable CategoryId={id} />
        </div>
      </div>
    </div>
  );
}
