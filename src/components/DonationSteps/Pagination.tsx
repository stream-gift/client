export default function Pagination({
    maxPages,
    page
} : {
    maxPages: number;
    page: number;
}) {
    return (
        <div className="flex items-center gap-2">
            {new Array(maxPages).fill(0).map((a, i) => {
                return (
                    <div
                        key={i}
                        className={`w-3 h-3 rounded-full border-[1px] border-teal ${i <= (page - 1) ? 'bg-teal' : ''}`}
                    >
                    </div>
                )
            })}
        </div>
    )
}