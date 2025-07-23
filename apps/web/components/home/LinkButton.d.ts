import { ReactNode } from "react";
export interface LinkButtonprops {
    children: ReactNode;
    href: string;
    variant?: "default" | "ghost";
    className?: string;
}
declare const LinkButton: ({ children, href, variant, className, }: LinkButtonprops) => import("react").JSX.Element;
export default LinkButton;
//# sourceMappingURL=LinkButton.d.ts.map