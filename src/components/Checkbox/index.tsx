import "./checkbox.scss";

export default function Checkbox({
    checked,
    onChange,
}: {
    checked: Boolean;
    onChange: (checked: Boolean) => void;
}) {
    return (
        <>
            {checked ? (
                <div
                    onClick={() => onChange(false)}
                    className="border-[#D9D9D9] border-[3px] w-[16px] h-[16px] bg-[#D9D9D9] cursor-pointer"
                ></div>
            ) : (
                <div
                    onClick={() => onChange(true)}
                    className="border-[#D9D9D9] border-[3px] w-[16px] h-[16px] bg-transparent cursor-pointer"
                ></div>
            )}
        </>
    );
}
