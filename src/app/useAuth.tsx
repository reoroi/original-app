"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { useRouter } from "next/navigation";
import { AuthContextType, AuthUserType } from "./Tyeps";

export const currentUserContext = createContext<AuthContextType>({} as AuthContextType);

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUserType|null>(null);
  const router = useRouter();
  useEffect(() => {
    const loginCheck = async () => {
      //現在のセッション情報を取りに行く
      const { data: sessionData } = await supabase.auth.getSession();
      // セッション情報があればログインユーザ名を取得
      if (sessionData.session !== null) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const getUser= {} as AuthUserType
        getUser.userName=user?.user_metadata.first_name;
        getUser.email=user?.user_metadata.email
        getUser.userID=user?.id||""
        setAuthUser(getUser);
        
        if (authUser && authUser.userID !== getUser.userID) {
          setAuthUser(null);
          router.push("/SignIn"); // **ログインページにリダイレクト**
        } else {
          setAuthUser(getUser);
        }
      }
};

    supabase.auth.onAuthStateChange((event, session) => {
      // セッション情報からユーザが存在するか
      const sessionCheck = session?.user.user_metadata.first_name;
      if (!sessionCheck) {
        router.push("/SignIn");
      }
    });

    loginCheck();
  }, []);
  return <currentUserContext.Provider value={{authUser,setAuthUser}}>{children}</currentUserContext.Provider>;
};