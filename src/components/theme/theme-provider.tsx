"use client";

import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";
import Header from "../layout/header";
import { cn } from "@/lib/utils";


// interface ExtendedThemeProviderProps{
//     children:React.ReactNode;
//     containerClassName?:string | null;

// }   as in documentation we are already given some interfaces etcc .. (As we have installed next-them)  
// ThemeProviderProps from next/themes
interface ExtendedThemeProviderProps extends ThemeProviderProps{
containerClassName?:string ;
}


export function ThemeProvider(
    {
        children,
        containerClassName,
        ...props
    }:
    ExtendedThemeProviderProps
){
    return (       
    <NextThemesProvider {...props}>
       
        <main className={cn('container mx-auto px-4',containerClassName)}>
     <Header/>
 {children}
        </main>
        </NextThemesProvider>
)
}