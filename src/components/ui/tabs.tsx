"use client";

import React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/libs/cn";

type TabVariant = "default" | "underline" | "outline";

const TabsContext = React.createContext<{ variant: TabVariant | null }>({
  variant: "default",
});

const tabsListVariants = cva(
  "bg-muted text-muted-foreground flex w-fit items-center justify-center rounded-lg p-[3px]",
  {
    variants: {
      variant: {
        default: "",
        underline:
          "bg-background before:bg-border relative w-full justify-start gap-1 rounded-none border-b-0 p-0 before:absolute before:bottom-0 before:left-0 before:z-0 before:h-0.5 before:w-full",
        outline:
          "bg-background before:bg-border relative w-full justify-start gap-2 rounded-none border-b-0 p-0 before:absolute before:bottom-0 before:left-0 before:h-px before:w-full",
      },
    },
  },
);

const tabsTriggerVariants = cva(
  "dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "data-[state=active]:bg-background flex-1",
        underline:
          "data-[state=active]:border-b-primary border-b-border hover:bg-accent/50 relative rounded-none border-b-3 px-4 py-2.5 data-[state=active]:shadow-none",
        outline:
          "border-b-border hover:bg-accent/50 data-[state=active]:border-l-border data-[state=active]:border-r-border data-[state=active]:border-t-border relative rounded-none rounded-t border border-t-transparent border-r-transparent border-l-transparent px-4 py-2.5 data-[state=active]:border-b-white data-[state=active]:shadow-none",
      },
    },
  },
);

interface TabsProps
  extends React.ComponentProps<typeof TabsPrimitive.Root>,
    VariantProps<typeof tabsListVariants> {}

function Tabs({ className, variant = "default", ...props }: TabsProps) {
  return (
    <TabsContext.Provider value={{ variant }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      />
    </TabsContext.Provider>
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { variant } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

interface TabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  const { variant } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabVariant,
  tabsListVariants,
  tabsTriggerVariants,
};
