const getName = (user) => {
    if (!user) return null
  
    const provider = user?.identities?.[0]?.provider
  
    switch (provider) {
      case 'google':
        return user.identities[0].identity_data?.full_name || user.email
      default:
        return user?.user_metadata?.display_name || user.email
    }
  }
  
export default getName