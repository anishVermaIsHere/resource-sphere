"use client";
import { useQuery } from "@tanstack/react-query";
import { getSheet } from "../../../services/api/resource";
import Section from "../../../components/common/layout/section";
import { Button } from "../../../components/ui/button";
import { FormModal } from "../../resource/components/resource-form";
import ResourceCard from "../../resource/components/resource-card";
import { Dots } from "../../../components/ui/loading-animation";
import AlertBox from "../../../shared/widgets/alertbox";



const Resources = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getSheet,
    queryKey: ["resources"]
  });

  const sheets = data?.data ?? []

  if (isLoading) return <Dots />
  if(isError) { 
    return <AlertBox variant="destructive" title={error?.response?.data?.message} statusCode={error.status} />
  }

  return (
    <div>
      <div>
        <FormModal>
          <Button>Add data</Button>
        </FormModal>
      </div>
      <Section>
        <h2>Resources</h2>
        <div className="my-5">
          {sheets.map((doc,ind)=>(
            <ResourceCard key={ind} doc={doc}/>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Resources;
