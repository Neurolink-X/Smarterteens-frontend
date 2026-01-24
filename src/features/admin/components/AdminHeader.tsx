import { Button } from "../../../shared/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../../../shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../shared/ui/dropdown-menu";
import { Bell, Settings, LogOut, User, Shield, Menu } from "lucide-react";

interface AdminHeaderProps {
  onToggleSidebar?: () => void; // optional callback for sidebar toggle
}

export function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left Section: Sidebar toggle + Title */}
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle Button (only visible on mobile/tablet) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300"
            onClick={onToggleSidebar}
          >
            <Menu className="h-6 w-6 text-slate-700" />
          </Button>

          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            <span className="text-slate-800">Smarter</span>
            <span className="yellow-glow">Teens</span> Admin Portal
          </h1>

          {/* Badge */}
          <div className="admin-badge hidden sm:flex">
            <Shield className="h-3 w-3 inline mr-1" />
            Admin Panel
          </div>
        </div>

        {/* Right Section: Notifications, Settings, Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300"
          >
            <Bell className="h-5 w-5 text-slate-600" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300"
          >
            <Settings className="h-5 w-5 text-slate-600" />
          </Button>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 px-3 py-2 h-auto hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-slate-800">Admin User</p>
                  <p className="text-xs text-slate-600">System Administrator</p>
                </div>
                <Avatar className="h-10 w-10 ring-2 ring-purple-300 ring-offset-2">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 professional-card">
              <DropdownMenuLabel>
                <div className="flex items-center gap-2">
                  <span>My Account</span>
                  <div className="admin-badge">Admin</div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-red-50 text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
