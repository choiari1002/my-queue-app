import { Metadata } from "next";
import { Button } from "@mantine/core";

// export const Metadata = {
//     title: "Confirm Page"
// };

const AuthConfirmPage = ({searchParams}: {searchParams: {confirmUrl: string}}) => {
    return (
        <>
        <div>{searchParams.confirmUrl}</div>

        <Button component="a" href={searchParams.confirmUrl}>
            Click Here To Confirm
        </Button>
        </>
    )
};

export default AuthConfirmPage;