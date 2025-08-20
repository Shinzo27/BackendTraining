import BlogCard from "@/components/BlogCard";

const Page = () => {
  return (
    <div className="m-5">
      <div className="">
        <h1 className="font-bold text-2xl">Blogs Corner</h1>
        <p className="text-sm font-light mt-1">
          Blogs uploaded by students & faculties
        </p>
      </div>
      <div className="mt-10 flex items-center justify-center gap-8 flex-wrap">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
};

export default Page;
