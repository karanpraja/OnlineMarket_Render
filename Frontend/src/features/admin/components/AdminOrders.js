import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../const";
import {
  UpdateOrdersAsync,
  fetchAllOrdersAsync,
  selectOrderbyLoggedInUser,
  selecttotalOrders,
} from "../../Order/OrderSlice";
import { useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import {  PencilSquareIcon } from "@heroicons/react/20/solid";
import Pagination from "../../common/Pagination";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const totalOrder = useSelector(selecttotalOrders);
  const Orders = useSelector(selectOrderbyLoggedInUser);
  console.log(Orders);
  console.log(totalOrder);
  const [editableOrder, setEditableOrder] = useState(null);
  const totalPages = Math.ceil(totalOrder / ITEMS_PER_PAGE);
  const [sort, setSort] = useState({});
  console.log(Orders);
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination })); /////
  }, [dispatch, page, sort]);
  const handleShow = (e) => {
    console.log("show");
  };
  const handleEdit = (e, order) => {
    console.log("edit");
    setEditableOrder(order.id);
  };
  const handleUpdate = (e, id) => {
    dispatch(UpdateOrdersAsync({ status: e.target.value, id }));
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-purple-600";
      case "delivered":
        return "bg-green-200 text-purple-600";
      case "cancelled":
        return "bg-red-200 text-purple-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };
  const handlePage = (e, page) => {
    setPage(page);
  };
  const handleSort = (option) => {
    console.log(option._sort, option._order);
    const newSort = { _sort: option._sort, _order: option._order }; /////
    setSort(newSort);
  };
  return (
    <div className="overflow-x-auto h-full">
      {Orders.length && (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center  font-sans overflow-hidden">
          <div className="w-max  h-full ">
            <div className="bg-white w-full h-full shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal cursor-pointer  ">
                    <th
                      className="py-3 px-6 text-left flex gap-3"
                      onClick={(e) => {
                        handleSort({
                          _sort: "id",
                          _order: sort._order === "asc" ? "desc" : "asc",
                        });
                      }}
                    >
                      OrderNumber
                      {sort._order === "asc" ? (
                        <ArrowDownIcon className="br-4 h-4 w-4 bg-white " />
                      ) : (
                        <ArrowUpIcon className="h-4 w-4 bg-white " />
                      )}{" "}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th
                      className="py-3 px-6 text-center flex"
                      onClick={(e) => {
                        handleSort({
                          _sort: "totalAmount",
                          _order: sort._order === "asc" ? "desc" : "asc",
                        });
                      }}
                    >
                      #TotalAmount
                      {sort._order === "asc" ? (
                        <ArrowDownIcon className="br-4 h-4 w-4 bg-white " />
                      ) : (
                        <ArrowUpIcon className="h-4 w-4 bg-white " />
                      )}
                    </th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Address</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                {Orders &&
                  Orders.map((order, index) => (
                    <tbody
                      key={index}
                      className="text-gray-600 text-sm font-light"
                    >
                      <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{order.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          {order.Items &&
                            order.Items.map((item, index) => (
                              <div key={index} className="flex items-center">
                                <div className="mr-2">
                                  <img
                                    className="w-6 h-6 rounded-full"
                                    src={item.product.imageSrc}
                                    alt={item.product.name}
                                  />
                                </div>
                                <span>
                                  {item.product.name} - Qt:{item.quantity} - $
                                  {discountedPrice(item.product)}
                                </span>
                              </div>
                            ))}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            <span>${order.totalAmount}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          {/* <span >{order.status}</span> */}
                          {editableOrder === order.id ? (
                            <select
                              onChange={(e) => {
                                handleUpdate(e, order.id);
                              }}
                              value={order.status}
                            >
                              <option value={"pending"}>pending</option>
                              <option value={"dispatched"}>dispatched</option>
                              <option value={"delivered"}>delivered</option>
                              <option value={"cancelled"}>cancelled</option>
                            </select>
                          ) : (
                            <span
                              className={`${chooseColor(
                                order.status
                              )} py-1 px-3 rounded-full text-xs`}
                            >
                              {order.status}
                            </span>
                          )}
                        </td>
                        {order.address && (
                          <td className="py-3 px-6 text-center">
                            <div>
                              <strong>
                                {
                                  order.address[0]
                                    .fullname
                                }
                              </strong>
                            </div>
                            <div>
                              {order.address[0].email},
                            </div>
                            <div>
                              {order.address[0].city},
                            </div>
                            <div>
                              {order.address[0].country},
                            </div>
                            <div>
                              {order.address[0].phone},
                            </div>
                            <div>
                              {order.address[0].region},
                            </div>
                            <div>
                              {
                                order.address[0]
                                  .streetaddress
                              }
                              ,
                            </div>
                          </td>
                        )}
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div className="flex gap-5">
                              <div
                                onClick={(e) => handleShow(e)}
                                className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                              >
                                <EyeIcon className="w-8 h-8"></EyeIcon>
                              </div>
                              <div
                                onClick={(e) => handleEdit(e, order)}
                                className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                              >
                                <PencilSquareIcon className="w-8 h-8"></PencilSquareIcon>
                              </div>
                            </div>
                            {/* <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg> */}
                            {/*  </div>
                       <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg> 
                        </div> */}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            </div>
          </div>
        </div>
      )}
      <Pagination
        pageHandler={handlePage}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        page={page}
        totalItems={totalOrder}
        totalPages={totalPages}
      />
    </div>
  );
};
export default AdminOrders;
