
// import * as React from "react"
// import {
//     User,
//     LayoutDashboard,
//     Inbox,
//     CheckSquare,
//     FolderKanban,
//     FileText,
//     MessageSquare,
//     Sun,
//     Moon,
//     Laptop,
//     LogOut,
//     Plus
// } from "lucide-react"

// import {
//     CommandDialog,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
//     CommandList,
//     CommandSeparator,
//     CommandShortcut,
// } from "@/shared/components/ui/command"
// import { useNavigate } from "react-router-dom"
// import { useAppStore } from "@/stores/appStore"
// import { useTheme } from "@/shared/ui/components/theme-provider"
// import { useAuthStore } from "@/stores/authStore"

export function CommandMenu() {
    // const [open, setOpen] = React.useState(false)
    // const navigate = useNavigate()
    // const { setTheme } = useTheme()
    // const { isCommandMenuOpen, setCommandMenuOpen, setActiveView, setCreateTaskOpen } = useAppStore()
    // const { logout } = useAuthStore()

    // Toggle internal state when store state changes
    // React.useEffect(() => {
    //     setOpen(isCommandMenuOpen)
    // }, [isCommandMenuOpen])

    // Update store when internal state changes (e.g. closing via dialog)
    // const onOpenChange = (isOpen: boolean) => {
    //     setOpen(isOpen)
    //     // setCommandMenuOpen(isOpen)
    // }

    // React.useEffect(() => {
    //     const down = (e: KeyboardEvent) => {
    //         if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
    //             e.preventDefault()
    //             onOpenChange(!open)
    //         }

    //         // Global shortcut for Create Task
    //         if (e.key === "c" && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey &&
    //             document.activeElement?.tagName !== 'INPUT' &&
    //             document.activeElement?.tagName !== 'TEXTAREA') {
    //             e.preventDefault()
    //             // setCreateTaskOpen(true)
    //         }
    //     }

    //     document.addEventListener("keydown", down)
    //     return () => document.removeEventListener("keydown", down)
    // }, [open, setCommandMenuOpen, setCreateTaskOpen])

    // const runCommand = React.useCallback((command: () => unknown) => {
    //     // setCommandMenuOpen(false)
    //     command()
    // }, [setCommandMenuOpen])

    return (
        // <CommandDialog open={open} onOpenChange={onOpenChange}>
        //     <CommandInput placeholder="Type a command or search..." />
        //     <CommandList>
        //         <CommandEmpty>No results found.</CommandEmpty>

        //         <CommandGroup heading="Navigation">
        //             <CommandItem onSelect={() => runCommand(() => { navigate('/dashboard'); setActiveView('dashboard'); })}>
        //                 <LayoutDashboard className="mr-2 h-4 w-4" />
        //                 <span>Dashboard</span>
        //             </CommandItem>
        //             <CommandItem onSelect={() => runCommand(() => { navigate('/dashboard'); setActiveView('inbox'); })}>
        //                 <Inbox className="mr-2 h-4 w-4" />
        //                 <span>Inbox</span>
        //             </CommandItem>
        //             <CommandItem onSelect={() => runCommand(() => { navigate('/dashboard'); setActiveView('tasks'); })}>
        //                 <CheckSquare className="mr-2 h-4 w-4" />
        //                 <span>Tasks</span>
        //             </CommandItem>
        //             <CommandItem onSelect={() => runCommand(() => { navigate('/dashboard'); setActiveView('projects'); })}>
        //                 <FolderKanban className="mr-2 h-4 w-4" />
        //                 <span>Projects</span>
        //             </CommandItem>
        //             <CommandItem onSelect={() => runCommand(() => { navigate('/dashboard'); setActiveView('documents'); })}>
        //                 <FileText className="mr-2 h-4 w-4" />
        //                 <span>Documents</span>
        //             </CommandItem>
        //         </CommandGroup>

        //         <CommandSeparator />

        //         <CommandGroup heading="Actions">
        //             <CommandItem onSelect={() => runCommand(() => setCreateTaskOpen(true))}>
        //                 <Plus className="mr-2 h-4 w-4" />
        //                 <span>Create New Task</span>
        //                 <CommandShortcut>C</CommandShortcut>
        //             </CommandItem>
        //             <CommandItem onSelect={() => runCommand(() => { navigate('/dashboard'); setActiveView('chat'); })}>
        //                 <MessageSquare className="mr-2 h-4 w-4" />
        //                 <span>Ask AI Assistant</span>
        //             </CommandItem>
        //         </CommandGroup>

        //         <CommandSeparator />

        //         <CommandGroup heading="Theme">
        //             <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
        //                 <Sun className="mr-2 h-4 w-4" />
        //                 <span>Light Mode</span>
        //             </CommandItem>
        //             <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
        //                 <Moon className="mr-2 h-4 w-4" />
        //                 <span>Dark Mode</span>
        //             </CommandItem>
        //             <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
        //                 <Laptop className="mr-2 h-4 w-4" />
        //                 <span>System</span>
        //             </CommandItem>
        //         </CommandGroup>

        //         <CommandSeparator />

        //         <CommandGroup heading="Account">
        //             <CommandItem onSelect={() => runCommand(() => { navigate('/settings'); setActiveView('profile'); })}>
        //                 <User className="mr-2 h-4 w-4" />
        //                 <span>Profile settings</span>
        //             </CommandItem>
        //             <CommandItem onSelect={() => runCommand(() => logout())}>
        //                 <LogOut className="mr-2 h-4 w-4" />
        //                 <span>Log out</span>
        //             </CommandItem>
        //         </CommandGroup>
        //     </CommandList>
        // </CommandDialog>
        <>
        </>
    )
}
    