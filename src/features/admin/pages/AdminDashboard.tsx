
import { cva } from "class-variance-authority";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { AdminHeader } from "../components/AdminHeader";
import { UserManagement } from "../components/UserManagement";
import { CourseApproval } from "../components/CourseApproval";
import { MentorApproval } from "../components/MentorApproval";
import { Analytics } from "../components/Analytics";

import {
  Users,
  BarChart3,
  UserCheck,
  BookOpen,

  Menu,
  X,
} from "lucide-react";

import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import React, { useState, useEffect, useRef } from "react";

/* -------------------- Utility -------------------- */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* -------------------- Context -------------------- */
type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

/* -------------------- Sidebar Provider -------------------- */
function SidebarProvider({
  defaultOpen = true,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
}) {
  const [_open, _setOpen] = useState(defaultOpen);
  const [openMobile, setOpenMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const open = _open;
  const setOpen = (value: boolean | ((value: boolean) => boolean)) => {
    const openState = typeof value === "function" ? value(open) : value;
    _setOpen(openState);
  };

  const toggleSidebar = React.useCallback(() => {
    return isMobile
      ? setOpenMobile((open) => !open)
      : setOpen((open) => !open);
  }, [isMobile]);

  const contextValue = React.useMemo(
    () =>
    ({
      state: open ? "expanded" : "collapsed",
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    } as const), // ✅ ensures literal types
    [open, isMobile, openMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipPrimitive.Provider delayDuration={0}>
        <div
          style={
            {
              "--sidebar-width": "20rem",
              "--sidebar-width-icon": "4rem",
              ...style,
            } as React.CSSProperties
          }
          className={cn("group/sidebar-wrapper flex min-h-svh w-full", className)}
          {...props}
        >
          {children}
        </div>
      </TooltipPrimitive.Provider>
    </SidebarContext.Provider>
  );
}

/* -------------------- Sidebar -------------------- */
const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
  }
>(({ side = "left", className, children, ...props }, ref) => {
  const { isMobile, open, openMobile, setOpenMobile } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside (only on mobile)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isMobile &&
        openMobile &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpenMobile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, openMobile, setOpenMobile]);

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div
          ref={ref}
          className={cn(
            "fixed inset-y-0 z-30 flex h-full transition-all duration-300 border-r border-slate-800/30 shadow-lg bg-sidebar text-sidebar-foreground",
            side === "left" ? "left-0" : "right-0",
            open ? "w-[--sidebar-width]" : "w-[--sidebar-width-icon]",
            className
          )}
          {...props}
        >
          {children}
        </div>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <>
          <div
            ref={sidebarRef}
            className={cn(
              "fixed inset-y-0 left-0 z-50 lg:hidden h-full bg-sidebar text-sidebar-foreground border-r border-slate-800/30 transition-transform duration-300",
              openMobile ? "translate-x-0" : "-translate-x-full"
            )}
          >
            {/* Cross/close button at right top */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-slate-800/40">
              <button
                onClick={() => setOpenMobile(false)}
                className="text-slate-300 ml-60 hover:text-white transition"
              >
                <X size={22} />
              </button>
            </div>
            {children}
          </div>

          {/* Overlay */}
          {openMobile && (
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setOpenMobile(false)}
            ></div>
          )}
        </>
      )}
    </>
  );
});
Sidebar.displayName = "Sidebar";

/* -------------------- Sidebar Parts -------------------- */
const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="content"
    className={cn(
      "flex flex-1 flex-col gap-2 overflow-auto scrollbar-thin scrollbar-thumb-slate-700/50",
      className
    )}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group"
    className={cn("flex flex-col p-2", className)}
    {...props}
  />
));
SidebarGroup.displayName = "SidebarGroup";

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul ref={ref} data-sidebar="menu" className={cn("flex flex-col gap-2", className)} {...props} />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("relative", className)} {...props} />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

/* -------------------- Sidebar Button -------------------- */
const sidebarMenuButtonVariants = cva(
  "flex w-full items-center gap-2 rounded-md p-3 text-left transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
  {
    variants: {
      active: {
        true: "bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border border-purple-400/30 shadow-md",
      },
      inactive: {
        true: "text-slate-300 hover:border hover:border-purple-400/20",
      },
    },
  }
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    isActive?: boolean;
  }
>(({ isActive = false, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        sidebarMenuButtonVariants({
          active: isActive,
          inactive: !isActive,
        }),
        className
      )}
      {...props}
    />
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";

/* -------------------- Floating Toggle -------------------- */
const SidebarToggleButton = () => {
  const { toggleSidebar, isMobile, openMobile, setOpenMobile } = useSidebar();

  return (
    <>
      {/* Desktop Toggle */}
      {!isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed lg:hidden top-6 left-4 z-50 p-2 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg hover:scale-110 transition-transform duration-200"
        >
        </button>
      )}

      {/* Mobile Toggle */}
      {isMobile && (
        <button
          onClick={() => setOpenMobile(!openMobile)}
          className="fixed lg:hidden top-22 left-4 z-50 p-2 rounded-md bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg hover:scale-105 transition-transform"
        >
          {openMobile ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
    </>
  );
};

/* -------------------- Main App -------------------- */
export default function App() {
  const [activeSection, setActiveSection] = useState("users");

  const menuItems = [
    {
      id: "users",
      title: "User Management",
      icon: Users,
      description: "Manage users, roles & permissions",
    },
    {
      id: "courses",
      title: "Course Approval",
      icon: BookOpen,
      description: "Review courses & mentor applications",
    },
    {
      id: "mentors",
      title: "Mentor Approval",
      icon: UserCheck,
      description: "Review mentor applications",
    },
    {
      id: "analytics",
      title: "Analytics",
      icon: BarChart3,
      description: "Performance insights & metrics",
    },
  ];

  const renderActiveComponent = () => {
    switch (activeSection) {
      case "users":
        return <UserManagement />;
      case "courses":
        return <CourseApproval />;
      case "mentors":
        return <MentorApproval />;
      case "analytics":
        return <Analytics />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <SidebarProvider>
      <SidebarToggleButton />

      <div className="flex min-h-screen w-full  bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <div className="flex items-center lg:mt-18 justify-between gap-3 p-4 border-b border-slate-800/30">
                <div className="flex items-center gap-3">
                  <img
                    src="/NavbarImages/SmaterTeensLogo.jpg"
                    alt="SmarterTeens Logo"
                    className="h-12 w-12 rounded-lg"
                  />
                  <div>
                    <div className="font-bold text-2xl text-white">
                      Smarter<span className="text-yellow-400">Teens</span>
                    </div>
                    <div className="text-sm text-slate-400 font-medium">
                      Admin Portal
                    </div>
                  </div>
                </div>
              </div>

              <SidebarMenu className="mt-6 px-3 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveSection(item.id)}
                        isActive={isActive}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="flex flex-col text-left">
                          <span className="font-semibold">{item.title}</span>
                          <span className="text-xs text-slate-400">
                            {item.description}
                          </span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 sm:ml-[20rem] md:ml-[2rem] lg:ml-[20rem] transition-all duration-300">
          <AdminHeader />
          <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">{renderActiveComponent()}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
