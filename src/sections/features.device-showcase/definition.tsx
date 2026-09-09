import type { FeaturesDeviceShowcaseSection } from "@/site-schema/generated/types";
import { DeviceShowcaseView, type DeviceShowcaseProps } from "./view";

export const toProps = (
  section: FeaturesDeviceShowcaseSection,
): DeviceShowcaseProps => section.content as unknown as DeviceShowcaseProps;
const definition = {
  id: "features.device-showcase" as const,
  type: "features" as const,
  variant: "device-showcase" as const,
  toProps,
  render: (section: FeaturesDeviceShowcaseSection) => (
    <DeviceShowcaseView {...toProps(section)} />
  ),
};
export default definition;
