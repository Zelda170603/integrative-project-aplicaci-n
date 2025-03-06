import { usePage } from '@inertiajs/react'; 
import Navbar from '@/components/navbar';
import '../../css/app.css';
export default function Layout({ children }) {
    const { auth } = usePage().props;
    return (
        
        <div className="flex min-h-screen flex-col items-center bg-neutral-900">
            <Navbar auth={auth} />
            <div className="w-full overflow-hidden bg-neutral-900 pt-16 pb-8 px-8 md:px-12 ">
                {children}
            </div>
        </div>
    );
}
