import React from 'react';

const Message = (props) => {
    const { className = '', message } = props;
    return <div className={`${ className } navbar-fixed-bottom`} dangerouslySetInnerHTML={{ __html: message }} />;
};

Message.propTypes = {
    className: React.PropTypes.string,
    message: React.PropTypes.string.isRequired
};

export default Message;
