import { Box } from '@chakra-ui/react'
import React from 'react'
import CloseIcon from '@mui/icons-material/CloseSharp'
const UserBadgeItem = ({ user, handleFunction, admin }) => {
    return (
      <Box
        px={2}
        py={1}
        borderRadius="lg"
        m={1}
        mb={2}
        variant="solid"
        fontSize={15}
        colorScheme="pink"
        cursor="pointer"
        onClick={handleFunction}
      >
        {user.name}
        {/* {admin === user._id && <span> (Admin)</span>} */}
        <CloseIcon pl={1} />
      </Box>
    );
  };
export default UserBadgeItem
