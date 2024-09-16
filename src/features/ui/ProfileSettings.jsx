import { useQuery } from "@tanstack/react-query";
import Form from "../admin/Form";
import { useUpdateUser } from "../admin/useUpdateUser";
import { getLoggedData } from "../user/apiUserOperations";
import Spinner from "./Spinner";
import Toast, { notifyError, notifySuccess } from "./Toast";

function ProfileSettings() {
  const { isLoading: isGettingUserData, data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: getLoggedData,
    onSuccess: () => {
      notifySuccess("Kullanıcı bilgileri başarıyla getirildi.");
    },
    onError: () => {
      notifyError("hata");
    },
  });

  if (isGettingUserData) return <Spinner />;
  return (
    <div>
      {userData && (
        <>
          <Toast />

          <Form
            defaultValues={userData}
            mutationHook={useUpdateUser}
            isEditing={true}
          />
        </>
      )}
    </div>
  );
}

export default ProfileSettings;
