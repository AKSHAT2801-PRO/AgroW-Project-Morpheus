import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Check, MessageSquare, PlusCircle, Smile } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

const MOCK_NOTIFICATIONS = [
    {
        id: 'n1',
        type: 'welcome',
        icon: Smile,
        colorClass: 'bg-red-50 text-[#FF4500] border-red-100',
        sender: 'AgroW Team',
        action: 'welcomed you to the platform',
        description: 'Update your profile to get the most out of our personalized farming recommendations.',
        time: '2 hours ago',
        isUnread: true,
        thumbnail: null
    },
    {
        id: 'n2',
        type: 'comment',
        icon: MessageSquare,
        colorClass: 'bg-green-50 text-[#2E7D32] border-green-100',
        sender: 'Ramesh Shinde',
        action: 'commented on your post in Pune Dairy Tech',
        description: '"I also use that specific feed additive, are you buying in bulk?"',
        time: '5 hours ago',
        isUnread: true,
        thumbnail: 'https://images.unsplash.com/photo-1596489391152-16782255d6b4?w=100&q=80'
    },
    {
        id: 'n3',
        type: 'follow',
        icon: PlusCircle,
        colorClass: 'bg-blue-50 text-[#3B82F6] border-blue-100',
        sender: 'Vidarbha Soyabean Community',
        action: 'accepted your join request',
        description: 'You can now create posts and interact with 4,100 members in this group.',
        time: '1 day ago',
        isUnread: false,
        thumbnail: null
    }
];

const NotificationsPage = () => {
    usePageTitle('Notifications');
    const navigate = useNavigate();

    // In a real app, this would use state and map to the mocked objects above.
    const notifications = MOCK_NOTIFICATIONS;

    return (
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 w-full mt-6 space-y-6 pb-20 pt-4 font-sans">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <h1 className="text-2xl font-extrabold text-slate-900">Notifications</h1>
                <div className="flex items-center gap-4">
                    <button className="text-sm font-bold text-green-600 hover:text-green-700 flex items-center gap-1.5 transition-colors">
                        <Check size={16} /> Mark all as read
                    </button>
                    <button
                        onClick={() => navigate('/settings?tab=notifications')}
                        className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"
                        title="Notification Settings"
                    >
                        <Settings size={20} />
                    </button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
                {notifications.map(notif => {
                    const Icon = notif.icon;
                    return (
                        <div
                            key={notif.id}
                            className={`p-4 sm:p-5 flex items-start gap-4 transition-colors cursor-pointer ${notif.isUnread ? 'bg-[#F0F9FF] hover:bg-[#E0F2FE]' : 'hover:bg-slate-50'
                                }`}
                        >
                            {/* Icon Avatar */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${notif.colorClass}`}>
                                <Icon size={20} />
                            </div>

                            {/* Content body */}
                            <div className="flex-grow min-w-0 pr-2">
                                <p className="text-sm text-slate-800 leading-snug">
                                    <span className="font-extrabold">{notif.sender}</span> {notif.action}
                                </p>
                                <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                                    {notif.description}
                                </p>
                                <p className="text-xs font-bold text-slate-400 mt-2">
                                    {notif.time}
                                </p>
                            </div>

                            {/* Optional Thumbnail / Unread Dot */}
                            <div className="flex flex-col items-end gap-2 shrink-0">
                                {notif.isUnread && !notif.thumbnail && (
                                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-2"></div>
                                )}
                                {notif.thumbnail && (
                                    <img
                                        src={notif.thumbnail}
                                        alt="Thumbnail"
                                        className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default NotificationsPage;
