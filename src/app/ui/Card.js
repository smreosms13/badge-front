import Link from "next/link";
import clsx from 'clsx';

export default function Card({voucher}) {
    const VoucherIcon = voucher.icon
    return(
        <Link 
            href={voucher.href}
            name={voucher.subject}
            className="flex border mb-1 p-2 items-center"
        >
            <div className="flex-initial me-5 flex justify-center items-center w-10 h-10 rounded-full bg-slate-100">
                <VoucherIcon className="w-6 h-6"></VoucherIcon>
            </div>
            <div className="flex-1">
                <p className="font-medium">{voucher.subject}</p>
                <p className="text-xs text-slate-300 font-poppins">{voucher.type}</p>
            </div>
            <div className="flex-initial"><p className={
                clsx('font-medium', {'text-blue-500' : voucher.achievement===100})
            }>{voucher.achievement}&nbsp;&#37;</p></div>        
        </Link> 
    );
}