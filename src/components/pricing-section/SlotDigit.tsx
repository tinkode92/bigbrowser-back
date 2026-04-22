import {motion} from "framer-motion";
import {cn} from "@/lib/utils";

const SlotDigit = ({digit, className}: { digit: number; className?: string }) => {
    return (
        <div className={cn("relative overflow-hidden", className)} style={{width: "0.6em", height: "1.2em"}}>
            <motion.div
                animate={{y: `-${digit * (100 / 10)}%`}}
                transition={{
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1],
                    type: "tween",
                }}
                style={{height: "1000%"}}
                className="absolute top-0 left-0 w-full"
            >
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center justify-center" style={{height: "10%"}}>
                        {i}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default SlotDigit;