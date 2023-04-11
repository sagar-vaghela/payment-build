import type { FC } from 'react';
import User01Icon from '@untitled-ui/icons-react/build/esm/User01';
import { Avatar, Box, ButtonBase, SvgIcon } from '@mui/material';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import { useAuth } from 'src/hooks/use-auth';

export const AccountButton: FC = () => {
  // const user = useMockedUser();
  const {user} = useAuth()
  const popover = usePopover<HTMLButtonElement>();

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'divider',
          height: 40,
          width: 40,
          borderRadius: '50%'
        }}
      >
        <Avatar
          sx={{
            height: 32,
            width: 32
          }}
          src={user?.iss}
        >
          <SvgIcon>
            <User01Icon />
          </SvgIcon>
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
};
