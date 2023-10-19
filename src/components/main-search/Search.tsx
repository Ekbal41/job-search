import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";

export function Search(props: TextInputProps) {
  const theme = useMantineTheme();
  return (
    <TextInput
      radius="xl"
      size="xl"
      placeholder="Search here.."
      rightSectionWidth={42}
      max={"sm"}
      maw={"500px"}
      mx={"auto"}
      my={"xl"}
      leftSection={
        <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
        >
          <IconArrowRight
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        </ActionIcon>
      }
      {...props}
    />
  );
}
