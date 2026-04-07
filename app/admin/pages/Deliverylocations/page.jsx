import Deliverylocations_Table from "../../components_admin/deliverylocations/Table";
import Deliverylocations_Form from "../../components_admin/deliverylocations/Form";
export default function Deliverylocations() {
  return (
    <div className="h-screen bg-[#F9FAFB]">
      <div className=" w-full bg-[#F9FAFB]">
        <div className=" pt-5 mx-5 relative h-full  ">
          <div className="flex justify-center  w-full  items-center ">
            <div className="flex justify-center items-center absolute  w-full">
              <Deliverylocations_Form />
            </div>

            <Deliverylocations_Table />
          </div>
        </div>
      </div>
    </div>
  );
}
