import React, { ChangeEvent, useCallback, useState } from "react";
import type { Page as PageType } from "src/types/page";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import { Box, Container, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import Profile from "src/sections/dashboard/profile/profile";
import Fascal from "src/sections/dashboard/profile/fascal";

const tabs = [
  { label: "PROFILE", value: "profile" },
  { label: "FISCAL DATA", value: "fiscal data" },
];

const Page: PageType = () => {
  const [currentTab, setCurrentTab] = useState<string>("profile");
  const {user} = useAuth();

  const handleTabsChange = useCallback(
    (event: ChangeEvent<{}>, value: string): void => {
      setCurrentTab(value);
    },
    []
  );
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3} sx={{ mb: 3 }}>
          <Typography variant="h4">PROFILE</Typography>
          <div>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
            <Divider />
          </div>
        </Stack>
        {currentTab === 'profile' && (
          <Profile />
          )}

          {currentTab === 'fiscal data' && (
          <Fascal />
          )}
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
