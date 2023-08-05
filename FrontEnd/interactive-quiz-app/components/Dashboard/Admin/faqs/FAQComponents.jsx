"use client"
import useFetchAllFAQs from "@/components/hooks/FetchFrequentFAQs";
import FAQsAdmins from "@/components/Dashboard/Admin/faqs/FAQsAdmins";

export default function FaqComponents() {
    const {isLoading, data} = useFetchAllFAQs();
    if (isLoading) return <div>Loading</div>
    return (
        <>
        <FAQsAdmins faqs={data}/>
        </>
    );
}