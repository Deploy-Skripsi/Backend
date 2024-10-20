const sessionExpired = (session) => {
    const maxAge = session.cookie.maxAge;
    const now = Date.now();
    const sessionLastAccess = session.lastAccess || now;
  
    return now - sessionLastAccess > maxAge;
  };
  
  module.exports = sessionExpired;
  