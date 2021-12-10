import { Center, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import FunctionSelectionForm from "./FunctionSelectionForm/FunctionSelectionForm";
import InputForm from "./InputForm/InputForm";

const ContractTesting = (props) => {
  const [contractIndex, setContractIndex] = useState(0);
  const [contractFunction, setContractFunction] = useState(null);

  return (
    <>
      <FunctionSelectionForm
        setContractFunction={setContractFunction}
        setContractIndex={setContractIndex}
        contractIndex={contractIndex}
      />
      <InputForm
        navSize={props.navSize}
        contractFunction={contractFunction}
        contractIndex={contractIndex}
      />
    </>
  );
};

export default ContractTesting;
