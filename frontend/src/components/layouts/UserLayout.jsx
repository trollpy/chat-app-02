export default function UserLayout({ user, onlineUsersId }) {
 return (
   <div className="relative flex items-center p-2 rounded-lg hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-all duration-200 group cursor-pointer">
     <div className="relative">
       <img 
         className="w-9 h-9 rounded-full ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-400 dark:group-hover:ring-blue-500 transition-all duration-200" 
         src={user?.photoURL || "https://via.placeholder.com/36x36?text=User"} 
         alt="" 
       />
       {onlineUsersId?.includes(user?.uid) ? (
         <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 dark:bg-green-400 border-2 border-white dark:border-gray-800 rounded-full animate-pulse shadow-lg"></span>
       ) : (
         <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gray-400 dark:bg-gray-600 border-2 border-white dark:border-gray-800 rounded-full"></span>
       )}
     </div>
     <div className="ml-2 flex-1">
       <span className="block font-medium text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
         {user?.displayName || user?.name || user?.email || "Unknown User"}
       </span>
       {onlineUsersId?.includes(user?.uid) && (
         <span className="text-xs text-green-600 dark:text-green-400 font-medium">
           Online
         </span>
       )}
     </div>
   </div>
 );
}