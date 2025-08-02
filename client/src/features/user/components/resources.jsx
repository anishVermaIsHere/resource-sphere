"use client";
import Section from "../../../components/common/layout/section";
import { Button } from "../../../components/ui/button";
import { FormModal } from "../../resource/components/resource-form";

const Resources = () => {
  return (
    <div>
      <div>
        <FormModal>
          <Button>Add data</Button>
        </FormModal>
      </div>
      <Section>
        <div>Resource list</div>
      </Section>
    </div>
  );
};

export default Resources;
