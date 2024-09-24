import { Accordion, AccordionTitle, AccordionContent } from "../ui/accordion";

import Series from "./series";

export default function MobileSeries() {
  return (
    <Accordion className="mb-4 border-b md:!hidden">
      <AccordionTitle className="text-sm hover:bg-background-muted">시리즈</AccordionTitle>
      <AccordionContent>
        <Series />
      </AccordionContent>
    </Accordion>
  );
}
