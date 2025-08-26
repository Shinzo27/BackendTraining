import { Button } from "@/components/ui/button";
import Image from "next/image";

const BlogCard = () => {
  return (
    <div className="p-10 bg-neutral-800 w-fit rounded-lg">
      <h1 className="max-w-60 truncate text-xl font-bold">
        Lorem ipsum dolor sit amet.
      </h1>
      <Image
        src="/user.jpg"
        width={250}
        height={100}
        alt=""
        className="rounded-lg mt-3"
      />
      <p className="max-w-60 truncate mt-3">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam reiciendis
        id delectus quo, minima nobis possimus officia modi, nesciunt
        consequatur quibusdam! Minima nobis, nihil, labore quaerat molestias
        explicabo enim eum eaque maiores esse voluptatem reprehenderit suscipit
        laborum? Est, velit reiciendis?
      </p>
      <Button className="bg-amber-600 mt-3">Read More</Button>
    </div>
  );
};

export default BlogCard;
