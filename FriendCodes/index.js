import BasePlugin from "@zlibrary/plugin";
import { Patcher, ReactComponents } from "@zlibrary";
import { openModal } from "@discord/modal";
import React from "react";
import styles from "styles";

import Modal from "./components/modal.jsx";

export default class FriendCodes extends BasePlugin {
    async onStart() {
        styles.inject();
        const FriendsTabBar = await ReactComponents.getComponentByName("TabBar", ".tabBar-ra-EuL");
        Patcher.after(FriendsTabBar.component.prototype, "render", (_, __, returnValue) => {
            returnValue.props.children.push(
                React.createElement("div", {
                    className: "item-3mHhwr item-3XjbnG themed-2-lozF",
                    key: "friend-codes",
                    onClick: () => {
                        openModal(props => (<Modal {...props} />));
                    }
                }, "Friend Codes")
            );
        });
    }

    onStop() {
        styles.remove();
        Patcher.unpatchAll();
    }
}