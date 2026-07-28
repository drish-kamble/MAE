import { useState } from "react";

const initialForm = {
  name: "",
  partNumber: "",
  brand: "",
  productType: "",
  description: "",
  pricingType: "QUOTE",
  price: "",
  stockStatus: "IN_STOCK",
};

function ProductModal({
  isOpen,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(initialForm);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">

      <div className="bg-white rounded-2xl w-full max-w-3xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          Add Product
        </h2>

        <div className="grid grid-cols-2 gap-5">

          <input
            placeholder="Product Name"
            className="border rounded-lg p-3"
            value={form.name}
            onChange={(e)=>
              setForm({...form,name:e.target.value})
            }
          />

          <input
            placeholder="Part Number"
            className="border rounded-lg p-3"
            value={form.partNumber}
            onChange={(e)=>
              setForm({...form,partNumber:e.target.value})
            }
          />

          <input
            placeholder="Brand"
            className="border rounded-lg p-3"
            value={form.brand}
            onChange={(e)=>
              setForm({...form,brand:e.target.value})
            }
          />

          <input
            placeholder="Category"
            className="border rounded-lg p-3"
            value={form.productType}
            onChange={(e)=>
              setForm({...form,productType:e.target.value})
            }
          />

          <select
            className="border rounded-lg p-3"
            value={form.pricingType}
            onChange={(e)=>
              setForm({...form,pricingType:e.target.value})
            }
          >
            <option value="FIXED">
              Fixed
            </option>

            <option value="QUOTE">
              Quote
            </option>

          </select>

          <input
            placeholder="Price"
            className="border rounded-lg p-3"
            value={form.price}
            onChange={(e)=>
              setForm({...form,price:e.target.value})
            }
          />

          <select
            className="border rounded-lg p-3"
            value={form.stockStatus}
            onChange={(e)=>
              setForm({...form,stockStatus:e.target.value})
            }
          >
            <option value="IN_STOCK">
              In Stock
            </option>

            <option value="OUT_OF_STOCK">
              Out Of Stock
            </option>

          </select>

          <input type="file" />

        </div>

        <textarea
          placeholder="Description..."
          rows="5"
          className="border rounded-lg p-3 w-full mt-5"
          value={form.description}
          onChange={(e)=>
            setForm({...form,description:e.target.value})
          }
        />

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="border px-6 py-3 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={()=>onSave(form)}
            className="bg-primary text-white px-6 py-3 rounded-xl"
          >
            Save Product
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductModal;