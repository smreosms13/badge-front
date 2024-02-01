import Header from "@/components/ui/Header";
export default function Layout({children}) {
    return (
        <div className="mx-auto max-w-sm h-dvh flex flex-col shadow-2xl px-6 py-8 bg-white">
            <Header></Header>
            <div className="w-full grow">
                {children}
            </div>
        </div>
    );
}