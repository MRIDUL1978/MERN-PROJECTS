import React, { useState, useEffect, useContext } from "react";
import DisplayDataSection from "./DisplayDataSection";
import {
  addPassword,
  getAllPasswords,
  updatePassword,
  deletePassword,
} from "../services/passwordListManagerServices";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [form, setform] = useState({ siteName: "", password: "" });
  const [editId, seteditId] = useState(null);
  const [passwordsList, setpasswordsList] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchPasswords = async () => {
        try {
          const data = await getAllPasswords();
          setpasswordsList(data);
        } catch (err) {
          console.log("Error fetching password", err);
        }
      };
      fetchPasswords();
    } else {
      setpasswordsList([]);
    }
  }, [user]);

  const handleInputChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handlebuttonChange = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/signin");
      return;
    }
    try {
      if (editId !== null) {
        const updatedList = await updatePassword(
          editId,
          form.siteName,
          form.password
        );
        setpasswordsList((prev) =>
          prev.map((item) => (item.id === editId ? updatedList : item))
        );
        seteditId(null);
      } else {
        const savedList = await addPassword(form.siteName, form.password);
        setpasswordsList((prev) => [...prev, savedList]);
      }
      setform({ siteName: "", password: "" });
    } catch (err) {
      console.log("Error saving password", err);
    }
  };

  const handleEditChange = async (id) => {
    try {
      if (!id) {
        return;
      }
      const et = passwordsList.find((item) => item.id === id);
      seteditId(et.id);
      setform({ siteName: et.siteName, password: et.password });
    } catch (err) {
      console.log("Error editing password", err);
    }
  };

  const handleDeleteChange = async (id) => {
    try {
      const deltedId = await deletePassword(id);
      const newList = passwordsList.filter((item) => item.id !== deltedId);
      setpasswordsList(newList);
    } catch (err) {
      console.log("Error deleting password", err);
    }
  };

  return (
    <main className="max-w-7xl mx-auto mt-16 px-4">
      <section className="flex justify-center">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-500 text-center leading-tight">
          Welcome To Your Own Password Manager
        </h1>
      </section>

      <section className="mt-8 md:mt-12 flex justify-center">
        <div className="w-full max-w-4xl bg-slate-800 rounded-lg shadow-xl p-6 md:p-8">
          <form onSubmit={handlebuttonChange} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="siteName"
                id="siteName"
                value={form.siteName}
                placeholder="Enter website URL..."
                onChange={handleInputChange}
                required
                className="w-full md:flex-1 px-4 py-3 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                placeholder="Enter password..."
                onChange={handleInputChange}
                required
                className="w-full md:flex-1 px-4 py-3 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              Add Password
            </button>
          </form>
        </div>
      </section>

      {user && (
        <DisplayDataSection
          passwordsList={passwordsList}
          handleEditChange={handleEditChange}
          handleDeleteChange={handleDeleteChange}
          form={form}
          setform={setform}
        />
      )}
    </main>
  );
};

export default HeroSection;
