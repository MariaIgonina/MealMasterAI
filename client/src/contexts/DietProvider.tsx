import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { submitForm, addOne, getAll } from "../api.service";
import { DietContext } from "../App";
import { IDiet, PreviousDiet, FormDiet } from "../Interfaces";



interface IDietContext {
  diets?: IDiet[];
  setDiets?: React.Dispatch<React.SetStateAction<IDiet[]>>;
  handleMealSubmit?: (formData: FormDiet, onSuccess: any) => Promise<void>;
  isLoading?: boolean;
  lastCreatedDiet?: PreviousDiet;
  children: React.ReactNode; 
}

const DietProvider: React.FC<IDietContext> = ({ children }) => {
  const [diets, setDiets] = useState<IDiet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastCreatedDiet, setLastCreatedDiet] = useState<{}>({});

  useEffect(()=> console.log('children', children), [])

  const { user, isAuthenticated } = useAuth0();

  const handleMealSubmit = async (formData: FormDiet, onSuccess:any) => {
    console.log('formData', formData)
    console.log('onSuccess', onSuccess)

    setIsLoading(true);
    try {
      const userEmail = isAuthenticated && user ? user.email : null;
      const auth0Id = isAuthenticated && user ? user.sub : null;
      const userName = isAuthenticated && user ? user.name : null;
      const userPic = isAuthenticated && user ? user.picture : null;

      const generatedDiet = await submitForm(
        formData,
        auth0Id,
        userEmail,
        userName,
        userPic
      );
      // await addOne(formData);
      setDiets((prevDiets) => [...prevDiets, generatedDiet]);
      // console.log(prevDiets)
      setLastCreatedDiet(generatedDiet);
      if (onSuccess) {
        setIsLoading(false);
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    fetchDiets();
  }, []);

  const fetchDiets = async () => {
    setIsLoading(true);
    const diets = await getAll();
    setDiets(diets);
    setIsLoading(false);
  };

  return (
    <DietContext.Provider
      value={{ diets, setDiets, handleMealSubmit, isLoading, lastCreatedDiet }}
    >
      {children}
    </DietContext.Provider>
  );
};

export default DietProvider;
