import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';
import Message from './Message';
import { useSelector } from 'react-redux';
import { useGetMessages } from '../hooks/useGetMessages';

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage()

    const { messages } = useSelector(store => store.message);
 

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {messages && messages?.map((mes) => {
                return <Message key={mes?._id} message={mes} />;
            })}
        </div>
    );
};

export default Messages;
