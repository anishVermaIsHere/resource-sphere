import { cn } from "../../../lib/utils";

const Section = ({ children, className }) => {
  return (
    <section className={cn(`p-2`, className)}>{children}</section>
  )
}

export default Section