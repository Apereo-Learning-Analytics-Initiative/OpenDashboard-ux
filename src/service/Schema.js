export const ADMIN_FIELD_MAX_LENGTH = 99;
export const ADMIN_FIELD_URL_REGEXP = new RegExp(/^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i);

export function getInputType(type) {
    return 'string';
}

export function useSchemaFromConfiguration(config) {

    const schema = {
        ui: {
            providerKey: {
                'ui:widget': 'hidden'
            },
            providerType: {
                'ui:widget': 'hidden'
            }
        },
        json: {
            type: 'object',
            required: [
                'providerKey',
                'providerType'
            ],
            properties: {
                providerKey: {
                    type: 'string',
                    default: config.providerKey
                },
                providerType: {
                    type: 'string',
                    default: config.providerType
                }
            }
        }
    };

    config.options.forEach(opt => {
        schema.json.properties[opt.key] = {
            type: getInputType(opt.type),
            title: opt.label,
            maxLength: opt.type !== 'url' ? ADMIN_FIELD_MAX_LENGTH : undefined,
            format: opt.type !== 'url' ? undefined : 'url'
        }
        if (opt.required) {
            schema.json.required.push(opt.key);
        }
        if (opt.encrypt || opt.type === 'password') {
            schema.ui[opt.key] = {
                'ui:widget': 'password'
            };
        }
        if (opt.type === 'url') {
            schema.ui[opt.key] = {
                'ui:widget': 'uri'
            };
        }
    });

    return schema;
}